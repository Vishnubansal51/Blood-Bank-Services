import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-5 ">
          <h1>
            welcome admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quasi
            commodi veniam! Et maxime quaerat commodi laboriosam. Iste error
            facilis obcaecati nihil consequuntur, repellat sequi praesentium
            deleniti reprehenderit aperiam natus, perferendis quas fuga vero
            officia, officiis fugit molestias at eius ipsam velit! Fugiat vitae
            laboriosam maxime aliquam sapiente distinctio quidem aliquid, illum
            adipisci nostrum perspiciatis. Consequatur consectetur dolore porro
            quae eveniet, reprehenderit numquam impedit animi? Consectetur,
            cumque porro quis sit iste neque pariatur recusandae? Tenetur enim
            explicabo inventore eius officia qui, error quibusdam natus.
            Molestiae ratione enim, itaque, dolores praesentium sed perferendis
            voluptate rerum libero vitae ad fugiat reiciendis consequuntur.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
