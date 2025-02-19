import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface HistoryUser {
  id: string;
  userId: string;
  totalAttempt: number;
  quizId: string;
  quizLevel: number;
  section: string;
  inquiryUsed: boolean;
  materialParent: string;
  scores: number[];
}

export const useHistoryUserQuiz = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<HistoryUser[]>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!session?.token) {
        throw new Error("No token available");
      }
      const path = id == "ALL" ? "/quiz/histories" : `/quiz/histories/${id}`;

      return api.get<any, ApiResponse<HistoryUser[]>>(`${path}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};
