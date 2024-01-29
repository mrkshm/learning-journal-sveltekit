import { goto } from "$app/navigation";
import { type Writable } from "svelte/store";

interface EntryFormInstance {
  resetTextarea: () => void;
}

interface CustomEnhanceProps {
  isSubmitting: Writable<boolean>;
  entryFormComponent: EntryFormInstance | null;
}

export const customEnhance = ({ isSubmitting, entryFormComponent }: CustomEnhanceProps) => {
  // Here is what's happening
  // This function is called just before the form is submitted
  isSubmitting.set(true);

  return async () =>
  // { result, update }
  {
    // This callback is called after the form submission is complete
    isSubmitting.set(false);
    if (entryFormComponent) {
      entryFormComponent.resetTextarea();
    }
    goto("/")
  };
};
