import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import closeImg from "../../assets/close.svg"
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClosed: () => void;
}

export function NewTransationModal ({isOpen, onRequestClosed}:NewTransactionModalProps) {
  const {createTransaction} = useTransactions();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event:FormEvent){
    event.preventDefault();

    await createTransaction({
      title,
      type,
      value,
      category,
    })

    setTitle("")
    setValue(0)
    setCategory("")
    setType("deposit")
    onRequestClosed();
  }

  return(
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClosed}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

    <button type="button" 
    onClick={onRequestClosed} 
    className="react-modal-close"
    >
      <img src={closeImg} alt="Fechar modal" />
    </button>
    
    <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar Informação</h2>

    <input 
    placeholder="Título"
    value={title}
    onChange={event => setTitle(event.target.value)}
    />

    <input 
    type="number"
    placeholder="Valor"
    value={value}
    onChange={event => setValue(Number(event.target.value))}
    />

    <TransactionTypeContainer>
      <RadioBox
      type="button"
      onClick={()=>{setType("deposit")}}
      isActive={type === "deposit"}
      activeColor="green"
      >
        <img src={incomeImg} alt="Depositos" />
        <span>Entrada</span>
      </RadioBox>

      <RadioBox
      type="button"
      onClick={()=>{setType("withdraw")}}
      isActive={type === "withdraw"}
      activeColor="red"
      >
        <img src={outcomeImg} alt="Retirada" />
        <span>Saída</span>
      </RadioBox>

    </TransactionTypeContainer>

    <input 
    placeholder="Categoria"
    value={category}
    onChange={event => setCategory(event.target.value)}
    />

    <button type="submit">
      Cadastrar
    </button>
    

    </Container>
    </Modal>
  );
}