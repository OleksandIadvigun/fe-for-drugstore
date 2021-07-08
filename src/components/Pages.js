import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {PageItem, Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalPages / device.limit)
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
                active={device.page === page}
                activeLabel={''}
                onClick={() => device.setPage(page)}
            >{page}</PageItem>
            )}
        </Pagination>
    </div>
  );
})

 export default Pages
