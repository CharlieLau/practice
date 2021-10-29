import { ReactElement } from "./constants"

const vdom = [{
    type: 'div',
    $$type: ReactElement,
    props: {
        id: 'A1',
        children: [{
            type: 'div',
            $$type: ReactElement,
            props: {
                id: 'B1',
                children: [{
                    type: 'div',
                    $$type: ReactElement,
                    props: {
                        id: 'C1'
                    }
                }, {
                    type: 'div',
                    props: {
                        id: 'C2',
                        children: ['C2']
                    }
                }]
            }

        }, {
            type: 'div',
            $$type: ReactElement,
            props: {
                id: 'B2'
            }
        }]
    }
}]
