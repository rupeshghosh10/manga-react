import Tag from '../Tag/Tag';

const TagList = ({ tags, showFullTags }) => {
  if (showFullTags || tags.length <= 6) {
    return (
      tags.map((tag, i) => <Tag key={i} tag={tag.attributes.name.en} />)
    );
  }

  const tagsList = tags.slice(0, 6).map((tag, i) => <Tag key={i} tag={tag.attributes.name.en} />);
  tagsList.push(<Tag key={9} tag={'More'} />)

  return tagsList;
}

export default TagList;
