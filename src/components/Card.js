import React from 'react'
import { Link } from 'react-router-dom'
import { cardBody, cardGrid , cardTitle , cardButton , cardDescribtion} from './tailwindClassComponents/card'
const Card = ({image , imageAlt , title , describtion }) => {
const companyUrl = title.toLowerCase().replace(/\s+/g, '-'); 
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="max-w-[720px] mx-auto">

        <div className={cardBody}>
            <div
                className={cardGrid}>
                <img
                    src={image}
                    alt={imageAlt} />
            </div>
            <div class="p-6">
                <h5 className={cardTitle}>
                    {title}
                </h5>
                <p class={cardDescribtion}>
                    {describtion}
                </p>
            </div>
            <div className="p-6 pt-0">
                <Link to={`/company${companyUrl}`} className="text-blue-500 hover:underline">
                <button
                    class={cardButton}
                    type="button">
                    Read More
                </button>
                </Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default Card