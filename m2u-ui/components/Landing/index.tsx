import LandingHeader from './LandingHeader'
import LandingMain from './LandingMain'

export default function Landing() {
  return (
    <div className="bg-white">
      <LandingHeader landing={true} />
      <LandingMain />
    </div>
  )
}
