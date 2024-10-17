import { useMemo, useState } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { z } from 'zod';

import { Logo } from '@/assets/svg';
import { LoadingButton } from '@/components/custom';
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

import { signIn as signInAcion } from '../features/authenticationActions';

const validationSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email.' })
    .email({ message: 'Please enter a valid email.' }),
  password: z
    .string({ required_error: 'Please enter your password.' })
    .min(8, { message: 'Your password must be at least 8 characters long.' }),
});

function SignIn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });

  const isLoading = useSelector((state: any) => state.auth.isLoading);
  console.log(isLoading, 'isLoading');

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
            description: issue.message,
            variant: 'destructive',
          });
        });

        return;
      }

      // const user = await dispatch(
      //   signInAcion({
      //     email: formDetails.email,
      //     password: formDetails.password,
      //   })
      // ).unwrap();

      // // set access token in local storage
      // localStorage.setItem('accessToken', user.accessToken);

      // navigate to the dashboard
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    }

    // return navigate('/style-guide');
    // }
  };

  // console.log(isLoading, 'isLoading')

  return (
    <React.Fragment>
      <Card className="border-none p-4 shadow-none">
        <CardHeader>
          <Logo className="rotate-90" />
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="ml-auto inline-block text-sm underline hover:text-primary"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="**********"
                onChange={updateFormDetails}
                required
              />
            </div>
            {isLoading ? (
              <LoadingButton loading={isLoading} className="w-full" />
            ) : (
              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmitForm}
                disabled={!hasFinishedSettingUp}
              >
                Login
              </Button>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default SignIn;
