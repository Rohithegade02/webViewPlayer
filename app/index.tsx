import { ROUTES } from "@/route";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={ROUTES.MAIN} />;
}
