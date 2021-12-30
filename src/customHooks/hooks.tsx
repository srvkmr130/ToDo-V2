import { useState } from "react";

export function useFormInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);

  function handleOnChange(
    e: any | null,
    allowManualValue: boolean = false,
    setManualValue: string = ""
  ) {
    allowManualValue
      ? setValue(setManualValue)
      : setValue(e?.currentTarget.value);
  }

  return {
    value,
    onChange: handleOnChange,
  };
}
