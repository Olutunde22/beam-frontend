import { cn } from '@/lib/utils'
import { useState } from 'react'

const ThemeToggle = () => {
    const [ theme, setTheme ] = useState<'light' | 'dark'>('light')
    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }
    return (
        <div
            className="relative bg-[#D1D1E0] rounded-full h-[28px] w-[50px] flex px-2 py-1 gap-2 cursor-pointer transition-all"
            onClick={toggleTheme}
        >
            <div className={cn(
                "bg-[#F5F5F5] h-5 z-0 w-5 mr-1 rounded-full absolute !transition-all !duration-200 right-0",
                theme === 'dark' && "ml-1 mr-0 right-[calc(100%-1.5rem)]"
            )} />


        </div>
    )
}

export default ThemeToggle
