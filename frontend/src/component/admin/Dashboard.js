import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidenav from './AdminLayout/AdminSidenav';
import AdminTopNav from './AdminLayout/AdminTopNav';
import AdminFooter from './AdminLayout/AdminFooter';
import BarChart from './BarChart';

export default function Dashboard() {

  const { REACT_APP_API_URL_LOCAL_SERVER, REACT_APP_API_URL_PRODUCTION_SERVER, REACT_APP_ENV_TYPE } = process.env;
  const baseURL = REACT_APP_ENV_TYPE === 'production' ? REACT_APP_API_URL_PRODUCTION_SERVER : REACT_APP_API_URL_LOCAL_SERVER;


  const [dashboardData, setDashboardData] = useState({
    total_user: 0,
    total_call_request: 0,
    total_register: 0,
    total_subscription: 0,
    total_pages: 0,
    // Add other fields as needed
  });

  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { label: 'Users', data: [], backgroundColor: 'rgba(75, 192, 192, 0.4)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
      { label: 'Callback Request', data: [], backgroundColor: 'rgba(153, 102, 255, 0.4)', borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 1 },
      { label: 'Register Data', data: [], backgroundColor: 'rgba(255, 159, 64, 0.4)', borderColor: 'rgba(255, 159, 64, 1)', borderWidth: 1 },
      { label: 'Subscription', data: [], backgroundColor: 'rgba(255, 205, 86, 0.4)', borderColor: 'rgba(255, 205, 86, 1)', borderWidth: 1 },
      { label: 'Pages', data: [], backgroundColor: 'rgba(54, 162, 235, 0.4)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 },
    ],
  });
  useEffect(() => {
    fetch(`${baseURL}/api/profile/dashboarddata`)
      .then(response => response.json())
      .then(data => {
        setDashboardData(data.countdata);

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        const userMonthlyData = new Array(12).fill(0);
        const callbackRequestMonthlyData = new Array(12).fill(0);
        const registerMonthlyData = new Array(12).fill(0);
        const subscriptionMonthlyData = new Array(12).fill(0);
        const pagesMonthlyData = new Array(12).fill(0);

        data.countGraph.total_user_by_month.forEach(item => {
          userMonthlyData[item.month - 1] = item.total_user;
        });
        
        data.countGraph.total_call_request_by_month.forEach(item => {
          callbackRequestMonthlyData[item.month - 1] = item.total_call_request;
        });
        data.countGraph.total_register_by_month.forEach(item => {
          registerMonthlyData[item.month - 1] = item.total_register;
        });
        data.countGraph.total_subscription_by_month.forEach(item => {
          subscriptionMonthlyData[item.month - 1] = item.total_subscription;
        });
        data.countGraph.total_pages_by_month.forEach(item => {
          pagesMonthlyData[item.month - 1] = item.total_pages;
        });

        setChartData({
          labels: months,
          datasets: [
            { label: 'Users', data: userMonthlyData, backgroundColor: 'rgba(75, 192, 192, 0.4)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
            { label: 'Callback Request', data: callbackRequestMonthlyData, backgroundColor: 'rgba(153, 102, 255, 0.4)', borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 1 },
            { label: 'Register Data', data: registerMonthlyData, backgroundColor: 'rgba(255, 159, 64, 0.4)', borderColor: 'rgba(255, 159, 64, 1)', borderWidth: 1 },
            { label: 'Subscription', data: subscriptionMonthlyData, backgroundColor: 'rgba(255, 205, 86, 0.4)', borderColor: 'rgba(255, 205, 86, 1)', borderWidth: 1 },
            { label: 'Pages', data: pagesMonthlyData, backgroundColor: 'rgba(54, 162, 235, 0.4)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }, [baseURL]);



  return (
    
      <div className='adminApp'>
        <AdminTopNav />

        <div id="layoutSidenav">
          <AdminSidenav />

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span>Total Users</span>
                        <span>{dashboardData.total_user}</span>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/admin/user">
                          View Details
                        </Link>
                        <div className="small text-white"><i className="fa fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span>Total Callback Request</span>
                        <span>{dashboardData.total_call_request}</span>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/admin/request-callback">
                          View Details
                        </Link>
                        <div className="small text-white"><i className="fa fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span>Total Register Data</span>
                        <span>{dashboardData.total_register}</span>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/admin/register">
                          View Details
                        </Link>
                        <div className="small text-white"><i className="fa fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span>Total Pages</span>
                        <span>{dashboardData.total_pages}</span>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/admin/page">
                          View Details
                        </Link>
                        <div className="small text-white"><i className="fa fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span>Total Subscription</span>
                        <span>{dashboardData.total_subscription}</span>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/admin/subscription">
                          View Details
                        </Link>
                        <div className="small text-white"><i className="fa fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xl-8 col-md-12'>
                    <BarChart data={chartData} />
                  </div>
                </div>
              </div>
            </main>

            <AdminFooter />
          </div>
        </div>
      </div>
 
  );
}
