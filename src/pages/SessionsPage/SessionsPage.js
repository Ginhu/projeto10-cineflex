import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PageContainer, SessionContainer, ButtonsContainer, FooterContainer } from "./SessionsPageStyled"

export default function SessionsPage(props) {

    const [movieSessions, setMovieSessions] = useState([])
    const [movieDetails, setmovieDetails] = useState({})
    const {idFilme} = useParams()

    useEffect(()=>{
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`).then(response=>
        {
            setMovieSessions(response.data.days)
            setmovieDetails(response.data)
        })
    }, [])


    return (
        <PageContainer>
            Selecione o horário
            <div>
                {movieSessions.map((el)=>
                <div key={el.id} data-test="movie-day">
                    <SessionContainer >
                    {el.weekday} - {el.date}
                        {el.showtimes.map((showtimes)=> 
                            <ButtonsContainer key={showtimes.id}>
                                <Link to={`/assentos/${showtimes.id}`}>
                                    <button data-test="showtime">{showtimes.name}</button>
                                </Link>
                            </ButtonsContainer>
                        )}
                        
                    </SessionContainer>
                </div>
                )}
            </div>

            <FooterContainer>
                <div data-test="footer">
                <div>
                    <img src={movieDetails.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movieDetails.title}</p>
                </div>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}