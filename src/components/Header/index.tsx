import { Container, Content } from "./styles"
import logoImg from "../../assets/logo.svg"

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {
  return (
    <header>
      <Container>
        <Content>
        <img src={logoImg} alt="logo dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
        </Content>
      </Container>
    </header>
  )
}