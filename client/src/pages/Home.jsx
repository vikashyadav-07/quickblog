import BlogList from '../components/BlogList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className='dark:bg-gray-900 dark:text-white'>
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
      <Footer/>
    </div>
  )
}

export default Home
