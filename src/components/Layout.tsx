import { Container } from "@mui/material"
import type { ReactNode } from "react"
import Header from "./Header"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="md">
      <Header />
      {children}
    </Container>
  )
}
export default Layout