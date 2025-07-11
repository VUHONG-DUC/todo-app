//タスク入力欄
const taskInput = document.getElementById('task-input');
//追加ボタン
const addBtn = document.getElementById('add-btn');
//タスクリスト
const taskList = document.getElementById('task-list');
//タスク情報
const taskInfo = document.getElementById('task-info');

//追加関数
function addTask(text) {
    // 新しい li 要素を作成
    const li =  document.createElement('li');
    // 新しい span 要素を作成し、タスクのテキストを設定
    const taskSpan = document.createElement('span');
    taskSpan.classList.add("task-name");
    // taskSpanのtextContentに引数textを設定
    taskSpan.textContent = text;
    // 作成した span 要素を li 要素に追加
    // （span要素をli要素の子として追加）
    li.appendChild(taskSpan);

    // 作成した li 要素をタスクリストに追加
    // （li要素をタスクリストに追加）
    taskList.appendChild(li);

    //タスクの削除機能
    //削除ボタン要素を追加
    const deleteBtn = document.createElement('button')
    //ボタンの表示するテキスト
    deleteBtn.textContent = '削除';
    //ボタンにクラス名を設定
    deleteBtn.className = 'delete-btn';
    //作成したボタンをliに追加
    li.appendChild(deleteBtn);

    //削除ボタンのクリックイベント設定
    deleteBtn.addEventListener('click' , () =>{
        li.remove();
        updateTaskInfo(); 
    })

    //タスクの完了/未完了切り替え機能
    //toggleBtnボタンを設定
    const toggleBtn = document.createElement('button');
    //ボタンの表示するテキスト
    toggleBtn.textContent = '完了';
    //ボタンにクラス名を設定
    toggleBtn.className = 'toggle-btn';
    //liに追加
    li.appendChild(toggleBtn);

    //完了ボタンのクリックイベント
    toggleBtn.addEventListener('click', () =>{
        //ボタンを押下するとSpanにcompletedクラスを追加・削除を切り替える
        taskSpan.classList.toggle('completed');
        //クリックするとcontainsを使って、completedクラスが存在すると完了の状態を切り替える
        if(taskSpan.classList.contains('completed')){
            toggleBtn.textContent = '未完了に戻す';
        }else{
            toggleBtn.textContent = '完了';
        }
        updateTaskInfo(); 
    })
    taskList.appendChild(li);
    updateTaskInfo(); 
}

//入力値のバリデーション
const errMsg = document.getElementById('error-msg');
function validateInput(inputValue){
    //入力値が空の時、エラーメッセージを表示
    if(inputValue.trim() === ''){
            errMsg.textContent = 'タスクを入力してください';
        return false;
    }
    //既に存在するタスクの時、エラーメッセージを表示
    if(isDuplicate(inputValue)){
        errMsg.textContent="同じタスクが既に存在します。";
        return false;
    }
    else {
            errMsg.textContent = '';
        return true;
    }
}

//重複タスクの検知機能
function isDuplicate(newTask){
    const tasks = Array.from(taskList.getElementsByTagName('li'));
    //各li内のタスク名を取得
    return tasks.some(li =>{
        const taskSpan = li.querySelector('span.task-name');
    if(!taskSpan){
        return false;
    }
    const existingTask = taskSpan.textContent.trim().toLowerCase();
    const newTaskNormalized = newTask.trim().toLowerCase();
         if (existingTask === newTaskNormalized) {
            return true;
        }
    })
}
function updateTaskInfo() {
const tasks = taskList.getElementsByTagName('li');

// 総タスク数を計算（tasksの配列の長さを利用）
const total = tasks.length;
// 未完了タスクの数を計算
// 未完了タスクはcompletedクラスが付いていないli要素の数です。
const incomplete = Array.from(tasks).filter((li) => {
// li要素内のタスク名部分のspan要素を取得
const taskNameSpan = li.querySelector('.task-name');
// taskNameSpanにcompletedクラスが付いているか確認
// completedクラスが付いていなければtrueを返す
return taskNameSpan && !taskNameSpan.classList.contains('completed');
}).length;
// 計算した数値を情報表示エリアに反映
taskInfo.textContent = `未完了のタスク：${incomplete} / 総タスク：${total}`;
}

//クリックイベントの設定
addBtn.addEventListener('click' , () =>{
    //入力した文字を取得する
    const taskText = taskInput.value.trim();
    if(!validateInput(taskText)){
        return;
    }else{
        addTask(taskText);
       taskInput.value = '';
    }
})
