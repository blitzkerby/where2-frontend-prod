import DOMPurify from 'dompurify';

export const convertObsidianToHTML = (text) => {
  text = text.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  text = text.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  text = text.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  text = text.replace(/\n$/gim, '<br />');

  return DOMPurify.sanitize(text.trim());
}

// const description = convertObsidianToHTML(text);

// const title = "Paragon International University";

// const Component = () => (
//   <div className="w-full mb-6">
//     <h2 className="text-2xl mb-4">{title}</h2>
//     <div dangerouslySetInnerHTML={{ __html: description }} />
//   </div>
// );
