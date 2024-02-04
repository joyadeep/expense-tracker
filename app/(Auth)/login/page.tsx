
import AuthCarousel from "@/components/AuthCarousel"
import Login from "@/components/Login"

const Auth = () => {
  return (
    <div className="w-full h-screen flex">
        <div className="flex flex-1 items-center bg-slate-50">
            <Login/>
        </div>
        <div className="flex-[2] flex justify-center items-center bg-sky-100">
            <AuthCarousel/>
        </div>
    </div>
  )
}

export default Auth