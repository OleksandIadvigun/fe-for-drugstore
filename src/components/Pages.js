import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {PageItem, Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {product} = useContext(Context)
    const pageCount = Math.ceil(product.totalPages / product.limit)
    const pages = []

    for(let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }
  return (
    <div>
        <Pagination className='mt-4'>
            {pages.map(page=>
            <PageItem
                key={page}
                active={product.page === page}
                activeLabel={''}
                onClick={() => product.setPage(page)}
            >{page}</PageItem>
            )}
        </Pagination>
    </div>
  );
})

 export default Pages
