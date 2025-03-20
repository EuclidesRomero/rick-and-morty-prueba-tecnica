interface EpisodeCardProps {
  name: string,
  air_date: string,
  episode: string,
  justificado: string,
   onClick?: () => void;
}
const EpisodeCard = ({ name, air_date, episode, justificado,onClick }: EpisodeCardProps) => {
  return (
    <div  onClick={onClick} className="w-80 h-20  md:hidden shadow mt-4 lg:flex lg:h-28">
      <div className={`flex flex-col h-full w-full items-${justificado} ${justificado === 'start' ? 'ml-1' : ''}`}>
        <span className="h-12 flex justify-center items-center font-black">{name}</span>
        <span className="h-12 flex justify-center items-center">{air_date}</span>
        <span className="h-12 flex justify-center items-center">{episode}</span>
      </div>
    </div>
  )
}

export default EpisodeCard
