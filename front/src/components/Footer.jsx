import './Footer.css'

const Footer = ({title}) =>  {
    return(
        <div>
        <footer>
            <p>&copy; 2024 - Todos os direitos reservados</p>
            <p>Entre em contato pelo e-mail: oficialDevEstagio@gmail.com</p>
            <nav>
            <ul>
            <li><a href="https://www.youtube.com/watch?v=ePjtnSPFWK8">Termos de uso</a></li>
            <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Política de privacidade</a></li>
            <li><a href="https://www.softexpert.com/pt-BR/">Sobre nós</a></li>
            </ul>
        </nav>
        </footer>
        </div>
    )
}

export default Footer