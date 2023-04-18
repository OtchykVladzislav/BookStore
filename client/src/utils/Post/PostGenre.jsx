import MySelect from '../../UI/select/MySelect'

const PostGenre = ({array, genre, setGenre}) => {
    return(
        <>
            <MySelect
                style={{margin: '10px'}}
                value={genre}
                onChange={selectedSort => setGenre(selectedSort)}
                defaultValue = "Жанры"
                options={array.map(e => {return {value: e.id, name: e.name}})}/> 
        </>
    )
}

export default PostGenre