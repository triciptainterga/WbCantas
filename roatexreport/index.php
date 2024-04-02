<?php
$url = "be-data.php?search=".($_GET['search'] ?? "")."&start_date=".($_GET['start_date'] ?? "")."&end_date=".($_GET['end_date'] ?? "");
// if (isset($_GET['search'])) $url .= "?search=" . $_GET['search'];
// if (isset($_GET['search'])) $url .= "?search=" . $_GET['search'];
// if(isset($_GET['start_date']) && !empty($_GET['start_date']) && isset($_GET['end_date']) && !empty($_GET['end_date'])) $url .= " AND (calldate BETWEEN '".$_GET['start_date']."' AND '".$_GET['end_date']." 23:59:59')";

$content = file_get_contents($url);
$data = json_decode($content, true);
?>
<!doctype html>
<html lang="en">
    <!--data-bs-theme="dark"-->

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Roatex Recording</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                Roatex Recording
            </a>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="mt-3"></div>
        <div class="card card-body">
            <form action="" method="get">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="">Start</label>
                            <input type="date" name="start_date" value="<?= $_GET['start_date'] ?? "" ?>" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="">End</label>
                            <input type="date" name="end_date" value="<?= $_GET['end_date'] ?? "" ?>" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" name="search" placeholder="Unique Id" aria-label="Unique Id" value="<?= $_GET['search'] ?? "" ?>" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
                </div>
            </form>
        </div>

        <div class="mt-3"></div>
        <table class="table">
            <thead>
                <tr>
                    <th>Unique Id</th>
                    <th>Call date</th>
                    <th>Disposition</th>
                    <th>Customer</th>
                    <th>Agent</th>
                    <th>Duration</th>
                    <th>Recording File</th>
                    <th>STT</th>
                    <th>QA</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($data as $key => $row) { ?>
                    <tr>
                        <td><?= $row['uniqueid'] ?></td>
                        <td><?= $row['calldate'] ?></td>
                        <td><?= $row['disposition'] ?></td>
                        <td><?= $row['src'] ?></td>
                        <td><?= $row['dst'] ?></td>
                        <td><?= $row['duration'] ?></td>
                        <td>
                            <audio controls>
                                <source src="<?= $row['recordingfile_url'] ?>" type="audio/wav">
                                Your browser does not support the audio element.
                            </audio>
                        </td>
                        <td>
                            <button class="btn btn-icon bg-white" type="button" onclick="openTss('<?= $row['uniqueid'] ?>')">
                                <img src="https://cdn-icons-png.flaticon.com/512/1599/1599234.png" class="img-fluid pl-2" width="30px">
                            </button>
                        </td>
                        <td>
                            <!--<a class="btn btn-icon bg-white" target="_blank" href="https://cloud.uidesk.id/v2uidesk/apps/Qc_Trx.aspx?id=<?= $row['uniqueid'] ?>">
                                <img src="https://cloud.uidesk.id/v2uidesk/images/icon/qa.png" class="img-fluid pl-2" width="30px">
                            </a>-->
                            <a class="btn btn-icon bg-white" target="_blank" onclick="openTss('<?= $row['uniqueid'] ?>')">
                                <img src="https://cloud.uidesk.id/v2uidesk/images/icon/qa.png" class="img-fluid pl-2" width="30px">
                            </a>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="tssModal" tabindex="-1" aria-labelledby="tssModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tssModalLabel">Transcript</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    
    <script>
        function openTss(uniqueid) {
            alert("Please contact your administration!");
            /*
            $.post("./transcript.php", {uniqueid}, (res) => {
                console.log(res);
                let arr = JSON.parse(res);
                console.log(arr);
                
                let tss = "";
                arr.results.forEach(item => {
                    tss += item.text+"\n\n";
                });
                
                $('#tssModal .modal-body').html(tss);
                $('#tssModal').modal('show');
            })*/
        }
    </script>
</body>

</html>