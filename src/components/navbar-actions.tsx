"use client"

import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { UserNav } from "./user-nav"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import type { Locale } from "@/i18n/config"

export function NavbarActions({ lang, dict }: { lang: Locale; dict: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  // 监听登录状态
  useEffect(() => {
    // 初始检查登录状态
    const checkLoginStatus = () => {
      const userEmail = decodeURIComponent(document.cookie
        .split('; ')
        .find(row => row.startsWith('userEmail='))
        ?.split('=')[1] || '');
      setIsLoggedIn(!!userEmail)
    }

    // 首次检查
    checkLoginStatus()

    // 监听 storage 事件
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    // 添加自定义事件监听
    window.addEventListener('loginStateChange', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('loginStateChange', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    document.cookie = 'userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.dispatchEvent(new Event('loginStateChange'));
    router.refresh();
    router.push(`/${lang}`);
  }
  
  const handleClick = () => {
    window.location.href = `tel:+380997055969`;
  }

  return (
    <div className="flex items-center">
      {/* <ThemeToggle /> */}
      <LanguageSwitcher />
      {isLoggedIn ? (
        <UserNav lang={lang} dict={dict} onLogout={handleLogout} />
      ) : (
        <Button onClick={handleClick} variant="ghost" size="sm">{dict.nav.signin}</Button>
      )}
    </div>
  )
}
