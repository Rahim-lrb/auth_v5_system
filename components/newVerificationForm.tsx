// @ts-nocheck
"use client"

import { CardWrapper } from "./auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onsubmit = useCallback(async () => {
        if (success || error) return; // just to stop the form message


        console.log(token);
        if (!token) {
            setError("Missing token");
            return;
        }

        try {
            const data = await newVerification(token);
            setSuccess(data.success);
        } catch (err) {
            setError("Something went wrong");
        }
    }, [token, success, error]);

    useEffect(() => {
        onsubmit();
    }, [onsubmit]);

    return (
        <CardWrapper headerLabel="Confirming your verification" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <div className="flex items-center justify-center w-full">
                {!success && !error && <BeatLoader />}

                {success && <FormSuccess message={success} />}
                {/* {error && <FormError message={error} />} */}

                {!success && (
                    <FormError message={error}/>
                )}
            </div>
        </CardWrapper>
    );
};
