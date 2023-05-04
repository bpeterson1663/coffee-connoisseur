import { useRouter } from "next/router";
import Link from "next/link"

export default function CoffeeStore() {
  const router = useRouter()
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/">
        Back to home
      </Link>
    </div>
  );
};
  
