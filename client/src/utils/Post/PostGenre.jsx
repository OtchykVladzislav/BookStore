import MySelect from '../../UI/select/MySelect'

const PostGenre = ({array, genre, setGenre}) => {
    return(
        <>
            <MySelect
                value={genre}
                onChange={selectedSort => setGenre(selectedSort)}
                defaultValue = "Жанры"
                options={array.map(e => {return {value: e, name: e}})}/> 
        </>
    )
}

export default PostGenre