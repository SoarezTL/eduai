import { SignIn } from "@clerk/nextjs"
export default function LoginPage() {
  return (
    <div style={{minHeight:"100vh",background:"#f9fafb",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <SignIn routing="hash" />
    </div>
  )
}
