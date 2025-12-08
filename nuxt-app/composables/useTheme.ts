export const useTheme = () => {
  const theme = useState('theme', () => 'light')
  const setTheme = (t: string) => theme.value = t
  return { theme, setTheme }
}
