import React from 'react'

function ChoiceTheme() {
    const [theme, setTheme] = React.useState("");
    const saveTheme = (theme: string) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    }
  return (
    <div>
        <h1>Вы можете выбрать понравившуюся тему чата</h1>
        <div className='theme_cards'>
            <div className='theme_card_dark' onClick={() => saveTheme("theme_card_dark")}>
                {theme === "theme_card_dark" ? <p>Тема выбрана!</p>:<p>Тёмная тема</p>}
            </div>

            <div className='theme_card_light' onClick={() => saveTheme("theme_card_light")}>
                {theme === "theme_card_light" ? <p>Тема выбрана!</p>:<p>Светлая тема</p>}
            </div>

            <div className='theme_card_blue' onClick={() => saveTheme("theme_card_blue")}>
                {theme === "theme_card_blue" ? <p>Тема выбрана!</p>:<p>Тёмно-синяя тема</p>}
            </div>
        </div>
    </div>
  )
}

export default ChoiceTheme