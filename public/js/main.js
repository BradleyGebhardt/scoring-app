$(document).ready(() => {
    $('.delete-score').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        const user = $target.attr('data-user');
        // console.log(user);
        $.ajax({
            method: 'DELETE',
            URL: '/user/' + user + '/' + id,
            success: () => {
                console.log('Deleting score');
                window.location.href = '/';
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});