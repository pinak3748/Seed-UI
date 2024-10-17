import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { z } from 'zod';

import { Logo } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ROUTES } from '@/constants/routes';
import { AppDispatch } from '@/store';

import { signUp as signUpAction } from '../features/authenticationActions';

const validationSchema = z.object({
  name: z
    .string({ required_error: 'Please enter your name.' })
    .min(3, { message: 'Your name must be at least 3 characters long.' }),
  email: z
    .string({ required_error: 'Please enter your email.' })
    .email({ message: 'Please enter a valid email.' }),
  password: z
    .string({ required_error: 'Please enter your password.' })
    .min(8, { message: 'Your password must be at least 8 characters long.' }),
});

function SignUp() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Determine if the form has been set up
  const hasFinishedSettingUp = useMemo(() => {
    const validationResult = validationSchema.safeParse(formDetails);

    return validationResult.success;
  }, [formDetails]);

  // Update the form details
  const updateFormDetails = (e: any) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmitForm = async (e: any) => {
    try {
      e.preventDefault();

      const validationResult = validationSchema.safeParse(formDetails);

      if (!validationResult.success) {
        validationResult.error.issues.forEach((issue) => {
          toast({
            description: 'Your message has been sent.',
          });
        });

        return;
      }

      // const { name, email, password } = formDetails;

      // const result = await dispatch(
      //   signUpAction({ name, email, password })
      // ).unwrap();

      // toast({
      //   description: result.message,
      //   variant: 'success',
      // });

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Card className="border-none p-4 shadow-none">
        <CardHeader>
          <Logo />
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Lewis Hamilton"
                onChange={updateFormDetails}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                onChange={updateFormDetails}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="*********"
                onChange={updateFormDetails}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!hasFinishedSettingUp}
              onClick={handleSubmitForm}
            >
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to={ROUTES.SIGN_IN} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default SignUp;
