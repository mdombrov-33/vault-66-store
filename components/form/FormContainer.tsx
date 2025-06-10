"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { actionFunction } from "@/types/form";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
  onSuccess,
}: {
  action: actionFunction;
  children: React.ReactNode;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state.message, onSuccess]);
  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
