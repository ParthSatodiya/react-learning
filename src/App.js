import {useState} from "react";
import Game from "./app/Game/Game";
import FilterableProductTable from "./app/FilterableProductTable/FilterableProductTable";
import SocialMediaFeed from "./app/SocialMediaFeed/SocialMediaFeed";

const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const TIC_TAC_TOE = 'tic-tac-toe';
const PRODUCT_TABLE = 'product-table';
const SOCIAL_MEDIA_FEED = 'social-media-feed';


function MainApp(props) {
    const [currentApp, setCurrentApp] = useState(TIC_TAC_TOE);

    const appList = [
        {id: TIC_TAC_TOE, component: <Game/>},
        {id: PRODUCT_TABLE, component: <FilterableProductTable products={products}/>},
        {id: SOCIAL_MEDIA_FEED, component: <SocialMediaFeed/>}
    ];

    function renderCurrentApp() {
        for (const app of appList) {
            if (app.id === currentApp) {
                return app.component;
            }
        }
    }

    return (
        <div className="container">
            <h4>Demos: </h4>
            {appList.map(app => {
                return (
                    <button
                        style={{'margin': '1px'}}
                        key={app.id}
                        onClick={() => setCurrentApp(app.id)}
                    >
                        {app.id}
                    </button>
                )
            })}
            <hr/>
            {renderCurrentApp()}
        </div>
    )
}

export default MainApp;