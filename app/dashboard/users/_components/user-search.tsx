"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./profile";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "@/components/loading-skeleton";

const UserSearch = () => {
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce(input, 500);
  const [search, setSearch] = useState<string>("");

  const [foundUser, setFoundUser] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setSearch(debouncedInput);
  }, [debouncedInput]);

  useEffect(() => {
    const findUser = async () => {
      setIsLoading(true);

      try {
        const res = await axios.post("/api/lk/get", {
          input: search,
        });
        const { status, content } = res.data;

        if (status != 200) {
          throw new Error("Error finding user id");
        }

        const { user_id } = content;
        if (user_id) {
          setFoundUser(user_id);
          router.refresh();
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (search != "") findUser();
  }, [search, router]);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <span className="text-[12px] font-medium uppercase">Поиск</span>
        <Input
          type="text"
          placeholder="Логин"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div>
        {isLoading && (
          <div className="flex justify-center">
            <LoadingSkeleton />
          </div>
        )}
        {foundUser && !isLoading && <Profile id={foundUser} login={search} />}
      </div>
    </>
  );
};

export default UserSearch;
