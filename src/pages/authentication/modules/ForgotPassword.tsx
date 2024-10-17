import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { set, z } from 'zod';

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

const validationSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email.' })
    .email({ message: 'Please enter a valid email.' }),
});

function ForgotPassword() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    email: '',
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Determine if the form has been set up
  const hasFinishedSettingUp = useMemo(() => {
    const validationResult = validationSchema.safeParse(formDetails);

    return validationResult.success;
  }, [formDetails]);

  // Update the form details
  const updateFormDetails = (e: any) => {
    setFormDetails((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const validationResult = validationSchema.safeParse(formDetails);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast({
          description: issue.message,
        });
      });

      return;
    }
    // Call the API to send the reset password email:
    setIsConfirmationModalOpen(true);
  };

  return (
    <React.Fragment>
      <Card className="border-none p-4 shadow-none">
        <CardHeader>
          <Logo className="rotate-90 " />
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            No worries, we’ll send you reset instructions.
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
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmitForm}
              disabled={!hasFinishedSettingUp}
            >
              Login
            </Button>
            {isConfirmationModalOpen && (
              <p className="text-center text-sm duration-500 animate-in">
                Don&apos;t receive an email?{' '}
                <span className="font-medium text-primary">Resend</span>
              </p>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Back to?{' '}
            <Link to={ROUTES.SIGN_IN} className="underline hover:text-primary">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default ForgotPassword;
