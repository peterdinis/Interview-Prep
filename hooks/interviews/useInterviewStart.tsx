import { useQuery } from "@tanstack/react-query";

type MockInterview = {
  id: string;
  interviewId: string;
  content: string;
};

export function useMockInterview(interviewId: string | undefined) {
  return useQuery<MockInterview>({
    queryKey: ["mockInterview", interviewId],
    queryFn: async () => {
      if (!interviewId) throw new Error("Interview ID is required");

      const res = await fetch(`/api/interviews/start/${interviewId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch mock interview: ${res.statusText}`);
      }

      const data = await res.json();
      return data.mockInterview as MockInterview;
    },
    enabled: !!interviewId, // only run when interviewId is available
  });
}