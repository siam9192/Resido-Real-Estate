/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
       
  color_primary:"#0d6efd",
  color_secondary: "#6c757d",
  color_success: "#198754",
   color_info: "#0dcaf0",
  color_warning: "#ffc107",
  color_danger: "#dc3545",
  color_light: "#f8f9fa",
  color_dark: "#212529",
  color_text_normal:"#2f405e",
  color_bg_green:"#f3f7fd"
      },
      fontFamily:{
        mooli:"Mooli', sans-serif",
        pop:"Poppins, sans-serif",
        jost:"'Jost', sans-serif"
      }
    },
  },
  plugins: [require("daisyui")],
}

