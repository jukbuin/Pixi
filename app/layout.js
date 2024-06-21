import "./globals.css";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {LoginBtn, LogOutBtn} from "@/app/ components/LoginBtn";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Time from "@/app/ components/time";
import WeatherComponent from "@/app/weather/Weather";

export const metadata = {
  title: "Pixi",
  description: "Generated by create next app",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({ children }) {
    let session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>

      <div id="wrap">
          {children}
          <div className="Bottom_bar">
              <div className="loginArea">
                  <Link href="/"><img src="/login.gif" alt="loginImage"/></Link>
                  {
                      session == null ? <LoginBtn/> : <LogOutBtn/>
                  }
              </div>
              <div className="timeArea">
                  <WeatherComponent/>
                  <Time />
              </div>
          </div>
      </div>
      </body>
    </html>
  );
}
