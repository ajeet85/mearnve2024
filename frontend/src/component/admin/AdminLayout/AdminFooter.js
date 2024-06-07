import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminFooter() {
  return (
    <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright © Gii Finance Network 2024</div>
              <div>
                <Link to="#">
                Privacy Policy</Link>
                ·
                <Link to="#">
                Terms &amp; Conditions</Link>
              </div>
          </div>
        </div>
    </footer>
  )
}
