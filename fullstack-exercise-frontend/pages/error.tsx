import Link from "next/link";
import { FunctionComponent } from "react";

const Error: FunctionComponent = () => {
  return (
    <main>
      <h1>There was an error</h1>
      <Link href="/">Back to homepage</Link>
    </main>
  );
};

export default Error;
