interface LongCardProps{
    name:string;
    age:number;
    onClick:()=>void
}
interface BaseCards{
item:string
    name:string;
    onClick:()=>void
}
export default function Card() {
return <p>hello</p>
}
export function LongCard(props:LongCardProps){
    return <p onClick={props.onClick} >name is {props.name} and age is {props.age}</p>
}
export function BaseCards(props:BaseCards) {
    return <div onClick={props.onClick} className="aspect-[1/1] w-full bg-zinc-300 rounded-md flex justify-center items-center hover:bg-zinc-200">
        <p className="font-semibold text-base" key={props.name}>{props.item}</p>
    </div>
}