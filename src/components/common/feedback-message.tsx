import { CircleAlert } from "lucide-react";

type FeedbackMessageProps = {
  children?: React.ReactNode;
};

export default function FeedbackMessage({ children }: FeedbackMessageProps) {
  if (!children) return null;

  return (
    <p className="text-center text-red-500  items-center gap-1 font-semibold text-sm flex justify-center">
      <CircleAlert size={15} /> {children}
    </p>
  );
}
