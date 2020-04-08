import fetch from "isomorphic-unfetch";

const TestData = (props) => {
    console.log('propsは'  + props);
    
    return (
    <div>
       {props.data.title} 
       {/* {text}  */}
       これはただの文章d
    </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/post_data", {method: 'GET'});
    const data = await res.json();
    console.log('initialは' + data);
    
    return {props: {data}};

};

export default TestData;