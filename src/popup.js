async function getForks() {

    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const url = new URL(tabs[0].url);
    const repoName = url.pathname.split('/').slice(1,3).join('/');
    if (!repoName) {
        alert("Not a GitHub repository");
        return;
    }

    // Fetch the result of 500 pages !
    const response = await fetch(`https://api.github.com/repos/${repoName}/forks?per_page=500`);
    const forks = await response.json();

    const tableBody = document.getElementById("table-body");
    forks.forEach(fork => {
        const row = document.createElement("tr");

        // Get link
        const link = document.createElement("td");
        const linkAnchor = document.createElement("a");
        linkAnchor.href = fork.html_url;
        linkAnchor.innerText = fork.html_url;
        link.appendChild(linkAnchor);

        // Get the branch
        const branch = document.createElement("td");
        branch.innerText = fork.default_branch;

        // Get number of forks
        const forks = document.createElement("td");
        forks.innerText = fork.forks;

        // Get number of opened issues
        const open_issues = document.createElement("td");
        open_issues.innerText = fork.open_issues;

        // Get creation date
        const created_at = document.createElement("td");
        // created_at.innerText = fork.created_at;
        created_date_from_now = moment(fork.created_at);
        created_at.innerText = created_date_from_now.fromNow();

        // Get update date
        const updated_at = document.createElement("td");
        // updated_at.innerText = fork.updated_at;
        updated_date_from_now = moment(fork.updated_at);
        updated_at.innerText = updated_date_from_now.fromNow();

        // Get push date
        const pushed_at = document.createElement("td");
        // pushed_at.innerText = fork.pushed_at;
        pushed_date_from_now = moment(fork.pushed_at);
        pushed_at.innerText = pushed_date_from_now.fromNow();

        row.appendChild(link);
        row.appendChild(branch);
        row.appendChild(forks);
        row.appendChild(open_issues);
        row.appendChild(created_at);
        row.appendChild(updated_at);
        row.appendChild(pushed_at);
        tableBody.appendChild(row);
    });

    $(document).ready(function() {
        $('#table-id').DataTable({
            "paging": true,
            "ordering": true,
            "info": true,
            "pageLength": 10,
            "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
        });
    });
}

getForks();