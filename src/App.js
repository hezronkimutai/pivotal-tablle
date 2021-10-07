import data from './data';
import './App.css';

const states = [...new Set(data.map(dta => dta.state))];
const categories = [...new Set(data.map(dta => dta.category))];
const subCategories = [...new Set(data.map(dta => dta.subCategory))];

const dtaArr = categories.map(cat => ({
  category: cat, subCategories: subCategories.map(sub => {
    return ({ data: data.filter(dta => dta.subCategory === sub), subCategory: sub })
  })
}))

function App() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', width: 'max-content', flexDirection: 'row' }}>
        <h4 style={{ padding: '5px', width: '150px' }}>Products</h4>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h4 style={{ width: '150px', height: '20px' }}></h4>
            <h4 style={{ padding: '10px' }}>States</h4>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: 'max-content', flexDirection: 'row' }}>
        <h4 style={{ padding: '0px', width: '150px', margin: 0 }}>Category</h4>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h4 style={{ width: '150px', height: '20px', margin: 0 }}>Sub Category</h4>
            {states.map(state => (<h4 style={{ width: '150px', height: '20px', background: '#A9A9A9', padding: '5px', margin: 0 }}>{state}</h4>))}
          </div>
        </div>
      </div>
      {dtaArr.map(dta =>
        <>
          <div style={{ display: 'flex', width: 'max-content', flexDirection: 'row' }}>
            <div style={{ padding: '10px', background: '#D6D6D6', width: '150px' }}>{dta.category}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {dta.subCategories.map(sub =>
                <div style={{ display: 'flex', flexDirection: 'row', background: '#D6D6D6' }}>
                  <h6 style={{ width: '150px', height: '20px' }}>{sub.subCategory}</h6>
                  {states.map(state => {
                    let arr = data.filter(dt => dt.state === state && dt.subCategory === sub.subCategory);
                    arr = arr.length ? arr[0] : {};
                    return (<div style={{ width: '150px', height: '20px', padding: '5px' }}>{arr.sales}</div>)
                  })}
                </div>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', width: 'max-content', background: '#999999' }}>
            <h5 style={{ padding: '10px', width: '150px' }}>{`${dta.category} total`}</h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h4 style={{ width: '150px', height: '20px' }}></h4>
                {states.map(state => {
                  let arr = data.filter(dt => dt.state === state);
                  const sum = arr.map(a => a.sales).reduce((a, b) => a + b);
                  return (<div style={{ width: '150px', height: '20px', padding: '5px' }}>{isNaN(sum) ? '' : sum.toFixed(2)}</div>)
                })}
              </div>
            </div>
          </div>
        </>

      )}
    </div>
  );
}

export default App;
