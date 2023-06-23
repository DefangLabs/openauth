import { atom, useAtom } from "jotai";

const accountFormAtom = atom({
  name: "",
});

export function useAccountForm() {
  const [form, setForm] = useAtom(accountFormAtom);
  return { form, setForm };
}
