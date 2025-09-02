import LoginPage from "./login/login"; // client component

export const metadata = {
  title: "Home | My App",
  description: "Welcome to My App",
};

export default function HomePage() {
  return <LoginPage />; // render client component
}