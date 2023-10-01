import Image from 'next/image'
import 'antd/dist/reset.css';
import PartialMain from './partials'

export default function Home() {
  return (
    <div style={{height:'100vh',width:'100vw'}}>
      <PartialMain/>
    </div>
  )
}
