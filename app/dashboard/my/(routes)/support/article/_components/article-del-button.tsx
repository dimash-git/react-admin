"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { homeBaseUrl } from "@/app/dashboard/my/nav";

const ArticleDelButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await axios.post("/api/support/article/delete", {
      id,
    });

    const { status } = res.data;

    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при удалении статьи",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Статья удалено успешно",
    });

    router.refresh();
    router.push(`${homeBaseUrl}/support`);
  };

  return (
    <Button
      variant="destructive"
      className="max-w-[130px] gap-2 p-0 h-8"
      onClick={handleDelete}
    >
      <Trash height={16} width={16} />
      <span>Удалить</span>
    </Button>
  );
};

export default ArticleDelButton;
