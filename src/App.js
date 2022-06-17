import {useState} from "react";
import Game from "./app/Game/Game";
import FilterableProductTable from "./app/FilterableProductTable/FilterableProductTable";

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


function MainApp(props) {
    const [currentApp, setCurrentApp] = useState(TIC_TAC_TOE);

    const appList = [
        {id: TIC_TAC_TOE, component: <Game/>},
        {id: PRODUCT_TABLE, component: <FilterableProductTable products={products}/>}
    ];

    function renderCurrentApp() {
        for (const app of appList) {
            if (app.id === currentApp) {
                return app.component;
            }
        }
    }

    return (
        <div>
            <nav style={{display: 'flex', backgroundColor: 'lightgray', fontSize: '20px'}}>
                <span style={{marginRight: '1em'}}>Demos: </span>
                {appList.map(app => {
                    return (
                        <button
                            key={app.id}
                            style={{marginRight: '1em', backgroundColor: currentApp===app.id ? 'darkgray' : 'white'}}
                            onClick={() => setCurrentApp(app.id)}
                        >
                            {app.id}
                        </button>
                    )
                })}
            </nav>
            <hr/>
            {renderCurrentApp()}
        </div>
    )
}

export default MainApp;