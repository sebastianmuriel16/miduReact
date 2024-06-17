import { Button, TextInput, Title, Badge } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";
export function CreateNewUser() {
  const { addUser } = useUserActions();

  const [result, setResult] = useState<"ok" | "ko" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name || !email || !github) {
      return setResult("ko");
    }

    addUser({ name, email, github });
    setResult("ok");
    form.reset();
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg mt-4">
      <Title className="mx-4 mt-4 self-start">Create new user</Title>
      <form onSubmit={handleSubmit} className="mt-2 mx-4 mb-2 ">
        <TextInput name="name" className="mb-1 rounded-lg" placeholder="Name" />
        <TextInput
          name="email"
          className="mb-1 rounded-lg"
          placeholder="Email"
        />
        <TextInput
          name="github"
          className="mb-1 rounded-lg"
          placeholder="Github"
        />

        <div className="flex items-center self-start mt-2 mb-2">
          <Button className="bg-blue-500 text-white rounded-lg" type="submit">
            Create user
          </Button>
          <span>
            {result === "ok" && (
              <Badge className="ml-2 bg-green-400 rounded-lg">
                User created
              </Badge>
            )}
            {result === "ko" && (
              <Badge className="ml-2 bg-red-400 rounded-lg px-2">
                Error with the form
              </Badge>
            )}
          </span>
        </div>
      </form>
    </div>
  );
}
